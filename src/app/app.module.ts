import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { NavbarLinkComponent } from './navbar/navbar-link/navbar-link.component';
import { ModalModule } from './modal/modal.module';
import { BD_URL } from './shared/tokens';
import { environment } from '../environments/environment';

/*let bdURL: string = 'http://localhost:4000/api';
if (process.env['NODE_ENV'] === 'production') {
	bdURL = 'https://safe-journey-56345.herokuapp.com/api';
}*/

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		FooterComponent,
		AboutComponent,
		NavbarLinkComponent,
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, ModalModule.forRoot()],
	providers: [
		{
			provide: BD_URL,
			//change from environment
			useValue: environment.bdUrl,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
