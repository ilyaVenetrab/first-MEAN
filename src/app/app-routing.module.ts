import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
	{
		path: 'locations',
		loadChildren: () => import('./locations/locations.module').then((m) => m.LocationsModule),
	},
	{
		path: 'about',
		component: AboutComponent,
	},
	{
		path: '**',
		loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
