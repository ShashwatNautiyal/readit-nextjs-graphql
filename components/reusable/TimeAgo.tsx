import React, { Suspense, useRef, useState } from "react";
import { getAgoDate } from "../../utils";

const TimeAgo = ({ time }: { time: string | undefined }) => {
	const [timeAgo] = useState(() => getAgoDate(time));

	return <time className="text-gray-400">{timeAgo}</time>;
};

export default TimeAgo;
