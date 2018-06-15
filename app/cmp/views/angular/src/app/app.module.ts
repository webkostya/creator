import {HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRootComponent} from './root';

@NgModule({
	declarations: [AppRootComponent],
	imports: [BrowserModule, HttpClientModule, AngularSvgIconModule],
	bootstrap: [AppRootComponent]
})
export class AppModule {
}