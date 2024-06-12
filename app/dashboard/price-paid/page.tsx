import { FloatingLabelInput } from "../../../components/AvgPricePostcodeInput";
import { ImageCheckboxes } from "../../../components/ImageCheckboxes";
import classes from '../../../css/Layout.module.css';
import { Suspense } from 'react'

export default function PricePaidPage() {
    return (
        <div>
            <div className={classes.content}>
                <Suspense fallback={<div>Loading...</div>}>
                    <FloatingLabelInput />
                </Suspense>
            </div>
            <div className={classes.content}>
                <Suspense fallback={<div>Loading...</div>}>
                    <ImageCheckboxes />
                </Suspense>
            </div>
        </div>
    );
}

