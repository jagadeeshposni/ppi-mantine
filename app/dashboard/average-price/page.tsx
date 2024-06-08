

import { FloatingLabelInput } from "../../../components/FloatingLabelInput";
import { ImageCheckboxes } from "../../../components/ImageCheckboxes";
import classes from '../../../css/Layout.module.css';
import PricesChart from "../../../components/PricesChart";
import { PriceDataByPropertyType } from "../../../lib/definitions";
import { fetchSampleData } from "../../../lib/postgres-data";

export default async function PricePaidPage() {

    let data: PriceDataByPropertyType[] = []

    data = await fetchSampleData('LE4');

    return (
        <>
            <div className={classes.content}>
                <FloatingLabelInput />
            </div>
            <div className={classes.content}>
                <ImageCheckboxes />
            </div>
            <div className={classes.content}>
                <PricesChart data = {data}/>
            </div>
        </>
    );
}