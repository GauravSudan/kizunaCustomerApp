import { Component, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';
import { Layout } from 'src/app/layout/layout.types';
import { AppConfig } from 'src/app/core/config/app.config';

@Component({
    selector     : 'layout',
    templateUrl  : './layout.component.html',
    styleUrls    : ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy
{
    config: AppConfig | undefined;
    layout: Layout = 'modern';
    scheme!: 'dark' | 'light';
    theme: string | undefined;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private _document: any,
        private _renderer2: Renderer2,
    )
    {
        
    }
    /**
     * On init
     */
    ngOnInit(): void
    {
        this._renderer2.setAttribute(this._document.querySelector('[ng-version]'), 'fuse-version', '1.0.0');
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        //this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
