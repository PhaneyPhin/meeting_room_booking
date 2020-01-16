import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'
import service from '@/service/service';
Vue.use(AclInstaller)

let initialRole = 'public';
var user = service.getUser();
if (user != "") {
  var { role_name } = user.user;
  initialRole = role_name;
} else {
  initialRole = 'public'
}
// alert(initialRole);
export default new AclCreate({
  initial: initialRole,
  notfound: '/home',
  router,
  acceptLocalRules: true,
  globalRules: {
    admin: new AclRule('admin').generate(),
    approver: new AclRule('approver').or('admin').generate(),
    member: new AclRule('approver').or('admin').or('member').generate(),
    public: new AclRule('public').or('approver').or('admin').or('member').generate(),
    notAdmin: new AclRule('approver').generate()
    // public: new AclRule('public').or('admin').or('editor').generate(),
  }
})
