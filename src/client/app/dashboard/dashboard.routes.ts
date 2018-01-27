import { Route } from '@angular/router';

import { HomeRoutes } from './home/index';
import { ItemRoutes } from './item/index';
import { BSComponentRoutes } from './bs-component/index';
import { AdminRoutes } from './admin/index';
import { CustomerRoutes } from './customer/index';
import { CustServiceRoutes } from './custservice/index';
import { OrderRoutes } from './order/index';
import { ItemStatisticsRoutes } from './itemstatistics/index';
import { DashboardGuard } from './dashboard-guard.service';


import { DashboardComponent } from './index';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
		canActivate: [ DashboardGuard ],
    	component: DashboardComponent,
    	children: [
	    	...HomeRoutes,
	    	...BSComponentRoutes,
	    	...ItemRoutes,
			...CustomerRoutes,
			...CustServiceRoutes,
			...AdminRoutes,
			...OrderRoutes,
			...ItemStatisticsRoutes
			
    	]
  	}
];
