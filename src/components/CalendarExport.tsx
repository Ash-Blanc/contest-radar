import { Contest } from "@/types/contest";

export function generateGoogleCalendarUrl(contest: Contest): string {
  const start = new Date(contest.startTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const end = new Date(contest.endTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
  
  const title = encodeURIComponent(`🏆 [PRIZED CP] ${contest.title} (${contest.prizeDescription})`);
  const details = encodeURIComponent(
    `Platform: ${contest.platformLabel}\nPrize Pool: ${contest.prizeDescription}\nURL: ${contest.url}\nEligibility: ${contest.eligibility}\nFormat: ${contest.format}`
  );
  const location = encodeURIComponent(contest.url);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export function downloadICS(contest: Contest): void {
  const start = new Date(contest.startTime).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const end = new Date(contest.endTime).toISOString().replace(/-|:|\.\d\d\d/g, "");

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ContestRadar//Prized Contest Alerts//EN",
    "BEGIN:VEVENT",
    `UID:${contest.id}@contestradar.local`,
    `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d\d\d/g, "")}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:🏆 [PRIZED CP] ${contest.title}`,
    `DESCRIPTION:${contest.prizeDescription} | Platform: ${contest.platformLabel} | Link: ${contest.url}`,
    `URL:${contest.url}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Prized contest starting in 1 hour!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `${contest.slug || "contest"}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
