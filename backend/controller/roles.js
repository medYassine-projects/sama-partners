const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
//client    
ac.grant("basic")
 .readOwn("profile")
 .updateOwn("profile")
//agent 
ac.grant("supervisor")
 .extend("basic")
 .readAny("profile")
//admin 
ac.grant("admin")
 .extend("basic")
 .extend("supervisor")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac;
})();