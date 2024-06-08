import { FloatingLabelInput } from "../../../components/FloatingLabelInput";
import { ImageCheckboxes } from "../../../components/ImageCheckboxes";
import classes from '../../../css/Layout.module.css';


export default function PricePaidPage() {
    return (
        <div>
           <div className={classes.content}>
                <FloatingLabelInput />
            </div>
            <div className={classes.content}>
                <ImageCheckboxes />
            </div>
        </div>
    );
}

