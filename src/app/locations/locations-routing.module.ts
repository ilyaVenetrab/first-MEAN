import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OneLocationComponent } from './one-location/one-location.component';
import { LocationsComponent } from './locations.component';
import { OneLocationResolver } from './one-location/one-location.resolver';

const routes: Routes = [
	{
		path: '',
		component: LocationsComponent,
	},
	{
		path: ':locationId',
		component: OneLocationComponent,
		resolve: {
			location: OneLocationResolver,
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LocationsRoutingModule {}
