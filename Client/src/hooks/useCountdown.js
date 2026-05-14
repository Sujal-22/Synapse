import { useEffect, useMemo, useState } from "react";

function calculateTimeLeft(targetDate, now) {
    if (!targetDate) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            finished: true,
        };
    }

    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (Number.isNaN(target) || difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            finished: true,
        };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        finished: false,
    };
}

export default function useCountdown(targetDate) {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return useMemo(() => {
        return calculateTimeLeft(targetDate, now);
    }, [targetDate, now]);
}