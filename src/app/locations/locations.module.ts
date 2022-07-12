import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { OneLocationComponent } from './one-location/one-location.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsService } from './locations.service';

@NgModule({
	declarations: [LocationsComponent, OneLocationComponent],
	imports: [CommonModule, LocationsRoutingModule],
	providers: [LocationsService],
})
export class LocationsModule {}
