import { NgModule } from '@angular/core';
import { YcoreSplashScreenService } from 'src/@ycore/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [
        YcoreSplashScreenService
    ]
})
export class YcoreSplashScreenModule
{
    /**
     * Constructor
     */
    constructor(private _ycoreSplashScreenService: YcoreSplashScreenService)
    {
    }
}
