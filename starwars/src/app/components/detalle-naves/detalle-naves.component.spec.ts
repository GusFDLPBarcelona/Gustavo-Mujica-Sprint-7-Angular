import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleNavesComponent } from './detalle-naves.component';

describe('DetalleNavesComponent', () => {
  let component: DetalleNavesComponent;
  let fixture: ComponentFixture<DetalleNavesComponent>;


  beforeEach(async () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DetalleNavesComponent]
      })
        .compileComponents();

      fixture = TestBed.createComponent(DetalleNavesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
})
