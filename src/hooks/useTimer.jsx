import { useEffect, useState } from 'react'

const useTimer = () => {
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [setTimer]);


    return { timer, setTimer };
}

export default useTimer