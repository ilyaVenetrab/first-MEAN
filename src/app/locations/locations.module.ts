import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { OneLocationComponent } from './one-location/one-location.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsService } from './locations.service';
import { RatingComponent } from './rating/rating.component';
import { ReviewComponent } from './one-location/review/review.component';
import { ReviewFormComponent } from './one-location/review/review-form/review-form.component';

@NgModule({
	declarations: [
		LocationsComponent,
		OneLocationComponent,
		RatingComponent,
		ReviewComponent,
		ReviewFormComponent,
	],
	imports: [CommonModule, LocationsRoutingModule],
	providers: [LocationsService],
})
export class LocationsModule {}
