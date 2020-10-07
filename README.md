
# Custom Server Template

This template uses a custom Node.js server rather than the built-in Express server used by Profound.js Spaces.

When configuring a custom server, find the main server file, select *Properties*, and mark the checkboxes labeled *App Start File* and *Custom Server*.

![custom-server](/community/docs/getting-started/img/custom-server.png)

To be accessible via Profound.js Spaces, your custom application server must listen on port **8081**, which you can access dynamically by using `process.env.PORT`. 


With custom servers, when you make changes to your server-side code, you must restart the application server. You can do this from the *Server menu* in the IDE.
