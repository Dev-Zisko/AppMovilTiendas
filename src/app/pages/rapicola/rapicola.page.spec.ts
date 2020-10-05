import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RapicolaPage } from './rapicola.page';

describe('RapicolaPage', () => {
  let component: RapicolaPage;
  let fixture: ComponentFixture<RapicolaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapicolaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RapicolaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
