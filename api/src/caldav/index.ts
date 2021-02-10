import { v2 as webdav } from 'webdav-server'
import {wateringTaskEventsPublic} from './letitrain'
import {exampleEventsPublic} from './example'
import {Application} from "express"

export async function createWebdavServer() {
  const server = new webdav.WebDAVServer({rootFileSystem: new webdav.VirtualFileSystem})

  server.rootFileSystem().addSubTree(server.createExternalContext(), {
    'public': {
      'wateringTasks.ics': await wateringTaskEventsPublic(),
      'example.ics': await exampleEventsPublic(),
    }
  }, (e) => {if(e) console.error(e)})

  return server
}

export async function useWebdavServer(app:Application, route:string) {
  app.use(webdav.extensions.express(route, await createWebdavServer()))
}
