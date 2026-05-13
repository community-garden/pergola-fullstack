for the the new pergola frontend frontend-vite I want a new scheduler component, that is perfect for our tech stack as the @pergola-fullstack/frontend-vite/src/pages/SeasonPlanner.tsx  based on DayPilot does not look so well in our mui v7 library; thus I want a perfectly clean separated into multiple components way of having a scheduler that is visually close to the @ereignis-metadata-framework/apps/frontend-vite/fixtures/bryntum_scheduler_full.jpg  (I attach it for you) 

the goal:

two or one pannel layout:

left panel can have items that can be tree structured and can be condensed based on screen space or by user as if it were a drawer (it is not a drawer but can possibly "feel" like it) - can have a header - the items of the left follow a typical default appearance - an icon (an image or reference to MuiIcon compatible component or an UTF-8 char, label and desciption (with ellipsis)) - the most condensed view shows only the icon. tree is possible - this can be used for example in our garden app for patches and their individual planting lanes - but please no garden specific thing now just flexible datamodel.



main panel has a flexible top header that displays a sequence possible infitite , thus lazy loaded when scolling ( reacts virtualize pattern) - it can be restricted via configuration. it can have multiple rows - for example in case of date - it can have a year row a month row and a  day row - this can be configured using a render timeline function ( we want to be flexible in that time can also be not fixed dates but rather timecode like in media editing programs, programmable stages,...).

the crucial most part is of course the main Panels way of diplaying items and entering items.
for all actions it should use motion/react - what is already installed in this repositiory.

as with every good scheduling library it should support multi lane -> so if two items overlap they will expand their vertical space to have them stacked. once they have been placed under each other.

the items itself have a default renderer, unless  the item-renderer function is been passed into the view.

based on the props passed to our scheduler following interactions can be enabled or disabled:

- creating a new item when touching/clicking an empty area
- moving an item (can also be diabled on a per item base) - use motion with good touch and mouse support and a physical feeling and possible snap options (snap based on steps or based on other items)!
- expanding the start or end of an item (can also be isabled on a per item base)

iteraction with the scheduler as a whole:

- scrolling left and right (either infinite range or possibly configured by start and end) 
- zooming by default only horizontal zoom but possibly also vertical zoom - support pinch zoom gesture

the default renderer of an item should support for the text being pushed to the left if we scoll from left to right and the item gets partially covered by the left border.

now to the data model and the state management:

I want the datamodel later to be fully compatible with our flexible graviola semantic dataStore architecture but the components we are now designing are agnostic about that but do not assume a fixed data model - they will make use of callbacks that can be passed in the initialization in order to get the data they need - these the data that is calculated will be memoized for performance and only be recalculated if the item itself change. the data passed in addition can be very flexible and is "carried with" so that callbacks fired when something to an item happens will get the data structure originally provided plus the calculated methods.

later we will use our tester and renderer based approach derived from JSON Forms and the Material React table tester - this means that I want every item to be able to deciede how it will look like based on the jsonschema - but the component you are designing with me does not need to carry any of this logic but it has to be kept in mind when designing the callbacks that can be passed to the Scheduler main component -> I love a convention before conviguration approach and when we just quickly want to light up a scheduler instance I want sensible defaults for everything.

state management will be done in a hook that can be passed - because in theory we want to be able to have multiple schedules on a page - this is not a task for redux, allthough we can manually as consumer of the scheduler component wire the things up if we want or we could even implement our own hook. the default hook will care for statemanagement and memoizing and maybe even ref keeping. if for certain things advanced logic is needed - this logic should always go into a separate funcion or even scheduleUtils.ts file because we might want to right tests on this later.

VERY IMPORTANT consideration for the state management: as we will connect it with a flexible data storage layer for all mutations the follwoing needs to be considered - probably mutations (moving items and so on) will be stored in a more or less performant datastore using lodash debounce -> the ui will most likely be optimistic -but in theory it can be that the mutation will fail for whatever reasons - thus there must be a possibility to undo the action but in a very clean manner that aligns well with tanstacks way of invalidating certain queries after a mutation has happend and possibly then we will know that either the data really has been updated or maybe not at all or in a diffrent way (for example because the backend decided to snap or just allows certain values ) - here I really want your help to dicde for the best 2026 react coding style to allow for optimistic updates + the possibly react to errors or partial updates with altering result. explain which modern architectural pattern you will use for that.

and of course we want everything to be within the storybook to quickly test diffrent aspects with diffrent state during development.

libraries that may be used in those components;
the library is opinoated at certain stages:
- date-fns whenever dat calculations are needed
- lodash-es whenever it canreduce boilerplate code or for things like debounce
- mui-v7 - use existing mui components whereever possible if it does not interfer with good ux - but we are programming for mui and want to use their theming and stylng system and so on from outside
- motion/react - for touch and move and gestures events and a 2026 physical feeling ux!
- @dnd-kit/core in order to allow elements to be dropped from outside to the schedule (can be enabled using - but maybe in a later stage)

out of scope:
- no editor for events - this can later be attached using callbacks (onEventClicked ,...)
- no detail view for events
- no tight coupling to any specifc data model

