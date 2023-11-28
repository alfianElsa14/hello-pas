import MainLayout from '@layouts/MainLayout';
import Detail from '@pages/Detail';
import EditUser from '@pages/EditUser';

import Home from '@pages/Home';
import Login from '@pages/Login';
import LoginDoctor from '@pages/LoginDoctor';
import LoginPatient from '@pages/LoginPatient';
import NotFound from '@pages/NotFound';
import UserAppointment from '@pages/UserAppointment';
import RegisterDoctor from '@pages/RegisterDoctor';
import RegisterPatient from '@pages/RegisterPatient';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: true,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/user/appointment',
    name: 'User Appointment',
    protected: true,
    component: UserAppointment,
    layout: MainLayout,
  },
  {
    path: '/detail',
    name: 'detail',
    protected: true,
    component: Detail,
    layout: MainLayout,
  },
  {
    path: '/edit',
    name: 'edit',
    protected: true,
    component: EditUser,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'login',
    protected: true,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/login/patient',
    name: 'LoginPatient',
    protected: false,
    component: LoginPatient,
    layout: MainLayout,
  },
  {
    path: '/register/patient',
    name: 'RegisterPatient',
    protected: false,
    component: RegisterPatient,
    layout: MainLayout,
  },
  {
    path: '/login/doctor',
    name: 'LoginDoctor',
    protected: false,
    component: LoginDoctor,
    layout: MainLayout,
  },
  {
    path: '/register/doctor',
    name: 'RegisterDoctor',
    protected: false,
    component: RegisterDoctor,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
