import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaNavesComponent } from './lista-naves.component';
import { NavesService } from '../../services/naves.service';
import { of } from 'rxjs';

describe('ListaNavesComponent', () => {
  let component: ListaNavesComponent;
  let fixture: ComponentFixture<ListaNavesComponent>;
  let navesServiceMock: any;

  beforeEach(async () => {
    navesServiceMock = {
      getNaves: jasmine.createSpy('getNaves').and.returnValue(of({
        results: [{ name: 'Nave 1' }],
        next: 'next-url'
      }))
    };

    await TestBed.configureTestingModule({
      declarations: [ListaNavesComponent],
      providers: [
        { provide: NavesService, useValue: navesServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListaNavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize listaNaves correctly', () => {
    component.cargarNaves();
    expect(navesServiceMock.getNaves).toHaveBeenCalled();
    expect(component.listaNaves.length).toBe(1);
    expect(component.listaNaves[0].name).toBe('Nave 1');
    expect(component.siguienteUrl).toBe('next-url');
  });
});