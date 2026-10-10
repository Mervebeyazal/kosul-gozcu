const {defineConfig}=require('cypress');module.exports=defineConfig({video:true,videoCompression:32,viewportWidth:1100,viewportHeight:850,e2e:{baseUrl:'http://127.0.0.1:4317',supportFile:false}});
