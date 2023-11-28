import MainLayout from '@layouts/MainLayout';

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
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/user/appointment',
    name: 'User Appointment',
    protected: false, // TODO: Change into protected
    component: UserAppointment,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
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
