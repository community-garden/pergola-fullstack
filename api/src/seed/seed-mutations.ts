import { DocumentNode, gql } from "@apollo/client/core"
import parse from "csv-parse/lib/sync"
import fetch from "node-fetch"

export const getSeedMutations: () => Promise<
  { mutation: DocumentNode; variables: any }[]
> = async () => {
  const res = await fetch(
    "https://cdn.neo4jlabs.com/data/grandstack_businesses.csv"
  )
  const body = await res.text()
  const records = parse( body, { columns: true } )
  const mutations = generateMutations( records )

  return mutations
}

const generateMutations: (
  records
) => { mutation: DocumentNode; variables: any }[] = ( records ) => {
  return records.map(( rec ) => {
    Object.keys( rec ).map(( k ) => {
      if ( k === "latitude" || k === "longitude" || k === "reviewStars" ) {
        rec[k] = parseFloat( rec[k] )
      } else if ( k === "reviewDate" ) {
        const dateParts = rec[k].split( "-" )
        rec.year = parseInt( dateParts[0] )
        rec.month = parseInt( dateParts[1] )
        rec.day = parseInt( dateParts[2] )
      } else if ( k === "categories" ) {
        rec[k] = rec[k].split( "," )
      }
    } )

    return {
      mutation: gql`
        mutation mergeReviews(
          $userId: ID!
          $userName: String
          $businessId: ID!
          $businessName: String
          $businessCity: String
          $businessState: String
          $businessAddress: String
          $latitude: Float
          $longitude: Float
          $reviewId: ID!
          $reviewText: String
          $year: Int
          $month: Int
          $day: Int
          $reviewStars: Float
          $categories: [String!]!
        ) {
          user: MergeUser(userId: $userId, name: $userName) {
            userId
          }
          business: MergeBusiness(
            businessId: $businessId
            name: $businessName
            address: $businessAddress
            city: $businessCity
            state: $businessState
            location: { latitude: $latitude, longitude: $longitude }
          ) {
            businessId
          }
          review: MergeReview(
            reviewId: $reviewId
            text: $reviewText
            date: { year: $year, month: $month, day: $day }
            stars: $reviewStars
          ) {
            reviewId
          }
          reviewUser: MergeReviewUser(
            from: { userId: $userId }
            to: { reviewId: $reviewId }
          ) {
            from {
              userId
            }
          }
          reviewBusiness: MergeReviewBusiness(
            from: { reviewId: $reviewId }
            to: { businessId: $businessId }
          ) {
            from {
              reviewId
            }
          }
          businessCategories: mergeBusinessCategory(
            categories: $categories
            businessId: $businessId
          ) {
            businessId
          }
        }
      `,
      variables: rec,
    }
  } )
}
