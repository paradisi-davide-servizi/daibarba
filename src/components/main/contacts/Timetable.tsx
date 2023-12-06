import { timetableSchema } from "@/lib/db/schema/contacts";
import React from "react";
import { z } from "zod";

export function Timetable({
	timetable,
}: {
	timetable: z.infer<typeof timetableSchema>;
}) {
	return (
		<>
			<div>{timetable.label}:</div>
			<div className=" flex flex-row gap-x-2">
				<div className=" font-semibold">
					{timetable.timeIntervals.map(i => `${i.startTime}-${i.endTime}`).join(" | ")}
				</div>
			</div>
		</>
	);
}

export function Timetables({
	timetables,
	className,
}: {
	timetables?: z.infer<typeof timetableSchema>[];
	className?: string;
}) {
	return (
		<>
			{(timetables?.length || 0) > 0 && (
				<div className={className}>
					{timetables?.map((t, i) => (
						<Timetable key={i} timetable={t} />
					))}
				</div>
			)}
		</>
	);
}
