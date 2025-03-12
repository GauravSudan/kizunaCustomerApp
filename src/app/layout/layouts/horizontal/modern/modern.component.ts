import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
    selector: 'modern-layout',
    templateUrl: './modern.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ModernLayoutComponent implements OnInit, OnDestroy {
    isShow: boolean = false;
    customerExist: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5000;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _activatedRoute: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private _router: Router,
    ) {
    }

    @HostListener('window:scroll')
    checkScroll() {
        const offset = 300;
        const offset_opacity = 1200;

        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var back_to_top = document.getElementsByClassName('cd-top');
        if (scrollPosition > offset) {
            back_to_top[0].classList.add('cd-is-visible');
        }
        else {
            var _visible = document.getElementsByClassName('cd-is-visible');
            var _fadeOut = document.getElementsByClassName('cd-fade-out');
            if (_visible.length !== 0) {
                back_to_top[0].classList.remove('cd-is-visible');
            }
            if (_fadeOut.length !== 0) {
                back_to_top[0].classList.remove('cd-fade-out');
            }
        }
        if (scrollPosition > offset_opacity) {
            back_to_top[0].classList.add('cd-fade-out');
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {

    }

    // TODO: Cross browsing
    gotoTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        // this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
}
