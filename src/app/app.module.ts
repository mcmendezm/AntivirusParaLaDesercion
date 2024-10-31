import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NewsComponent } from './components/pages/news/news.component';
import { OurteamComponent } from './components/pages/ourteam/ourteam.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeroComponent } from './components/pages/home/componentHome/hero/hero.component';
import { OpportunitiesComponent } from './components/pages/home/componentHome/opportunities/opportunities.component';
import { ServicesComponent } from './components/pages/home/componentHome/services/services.component';
import { SearchComponent } from './components/pages/news/newsComponents/search/search.component';
import { OpportunityCardsComponent } from './components/pages/news/newsComponents/opportunity-cards/opportunity-cards.component';
import { TeamSectionComponent } from './components/pages/ourteam/ourteamComponents/team-section/team-section.component';
import { WhoWeAreComponent } from './components/pages/ourteam/ourteamComponents/who-we-are/who-we-are.component';
import { ValuesSectionComponent } from './components/pages/ourteam/ourteamComponents/values-section/values-section.component';
import { FormSectionComponent } from './components/pages/register/registerComponents/form-section/form-section.component';
import { BenefitsSectionComponent } from './components/pages/register/registerComponents/benefits-section/benefits-section.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LoginFormComponent } from './components/pages/login/loginComponents/login-form/login-form.component';
import { SocialLoginComponent } from './components/pages/login/loginComponents/social-login/social-login.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { WompiButtonComponent } from './components/shared/wompi-button/wompi-button.component';
import { OpportunitieCardComponent } from './components/pages/home/componentHome/opportunities/opportunitie-card/opportunitie-card.component';
import { ServicesCardComponent } from './components/pages/home/componentHome/services/services-card/services-card.component';
import { TeamCardComponent } from './components/pages/ourteam/ourteamComponents/team-card/team-card.component';
import { OpportunityCardComponent } from './components/pages/news/newsComponents/opportunity-card/opportunity-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselComponent } from './components/pages/news/newsComponents/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NewsComponent,
    OurteamComponent,
    RegisterComponent,
    FooterComponent,
    HeroComponent,
    OpportunitiesComponent,
    ServicesComponent,
    SearchComponent,
    OpportunityCardsComponent,
    TeamSectionComponent,
    WhoWeAreComponent,
    ValuesSectionComponent,
    FormSectionComponent,
    BenefitsSectionComponent,
    LoginComponent,
    LoginFormComponent,
    SocialLoginComponent,
    ButtonComponent,
    WompiButtonComponent,
    OpportunitieCardComponent,
    ServicesCardComponent,
    TeamCardComponent,
    OpportunityCardComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    TranslocoRootModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
