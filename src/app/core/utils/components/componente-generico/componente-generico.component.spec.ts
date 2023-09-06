import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteGenericoComponent } from './componente-generico.component';

describe('ComponenteGenericoComponent', () => {
  let component: ComponenteGenericoComponent;
  let fixture: ComponentFixture<ComponenteGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteGenericoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
