import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerHarness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([{ path: '**', component: AppComponent }])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    routerHarness = await RouterTestingHarness.create('/');
  });

  it(`should render the title`, () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('mat-toolbar span')?.textContent;

    expect(title).toEqual(component.title);
  });

  it('should activate tabs when navigating', async () => {
    const link = '/spellbook';

    await routerHarness.navigateByUrl(link);

    const tab = component.navigationTabs().find((tab) => tab.link === link);

    const otherTabs = component
      .navigationTabs()
      .filter((tab) => tab.link !== link);

    expect(tab?.active).toBeTrue();
    otherTabs.forEach((tab) => expect(tab.active).toBeFalse());
  });
});
