import React from "react";
import './Calculating.css';

const Calculating: React.FC = () => {
    const timer = React.useRef<any>();
    const [helper, setHelper] = React.useState(false);

    React.useEffect(() => {
        timer.current = setTimeout(() => {
            setHelper(true);
        }, 5000);

        return () => {
            clearTimeout(timer.current);
        };
    });

    return (
        <div className="calculating">
            <span>Calculating...</span>
            {helper && <span>If this is taking a while, something is probably broken, Corridore might be able to help.</span>}
        </div>
    );
};

export default Calculating;
