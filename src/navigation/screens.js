import { Navigation } from 'react-native-navigation';
import Welcome from '../screens/welcome';
import Register from '../screens/register';
import Login from '../screens/login';
import Dashboard from '../screens/dashboard';
import SideMenu from '../components/side-menu';
import Companies from '../screens/companies';
import ItemInfo from '../screens/item-info';
import EditItem from '../screens/edit-item';
import AddItem from '../screens/add-item';
import AddCompany from '../screens/add-company'
import CompanyInfo from '../screens/company-info';
import EditCompany from '../screens/edit-company';
import Profile from '../screens/profile';
import Settings from '../screens/settings';
import EditProfile from '../screens/edit-profile';
import WrapperProvider from '../config/WrapperProvider';
import AddPost from '../screens/add-post';
import MyScreen from '../screens/my-screen';

export function registerScreens() {
  Navigation.registerComponent('canvas.Welcome', () => WrapperProvider(Welcome));
  Navigation.registerComponent('canvas.Register', () => WrapperProvider(Register));
  Navigation.registerComponent('canvas.Login', () => WrapperProvider(Login));
  Navigation.registerComponent('canvas.Dashboard', () => WrapperProvider(Dashboard));
  Navigation.registerComponent('canvas.Companies', () => WrapperProvider(Companies));
  Navigation.registerComponent('canvas.ItemInfo', () => WrapperProvider(ItemInfo));
  Navigation.registerComponent('canvas.EditItem', () => WrapperProvider(EditItem));
  Navigation.registerComponent('canvas.AddItem', () => WrapperProvider(AddItem));
  Navigation.registerComponent('canvas.EditCompany', () => WrapperProvider(EditCompany));
  Navigation.registerComponent('canvas.CompanyInfo', () => WrapperProvider(CompanyInfo));
  Navigation.registerComponent('canvas.Profile', () => WrapperProvider(Profile));
  Navigation.registerComponent('canvas.EditProfile', () => WrapperProvider(EditProfile));
  Navigation.registerComponent('canvas.Settings', () => WrapperProvider(Settings));
  Navigation.registerComponent('canvas.SideMenu', () => WrapperProvider(SideMenu));
  Navigation.registerComponent('canvas.AddCompany', () => WrapperProvider(AddCompany));
  Navigation.registerComponent('canvas.AddPost', () => WrapperProvider(AddPost));
  Navigation.registerComponent('canvas.MyScreen', () => WrapperProvider(MyScreen));

}
