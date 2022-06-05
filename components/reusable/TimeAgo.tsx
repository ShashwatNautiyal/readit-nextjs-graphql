import React, { Suspense, useRef, useState } from "react";
import { getAgoDate } from "../../utils";

const TimeAgo = ({ time }: { time: string | undefined }) => {
	return <time className="text-gray-400">{getAgoDate(time)}</time>;
};

export default TimeAgo;
