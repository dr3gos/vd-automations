# School announcement automation

Google Apps Script tools I built while leading the Tech Integration Council at the American International School of Bucharest. They automate two recurring tasks: updating the date and eight-day rotation on the daily announcements, and copying those announcements to the presentation shown on the hallway TVs.

The aim was to remove the repetitive editing and copying from the morning routine while keeping the classroom and TV presentations consistent.

## What the scripts do

### Update the date and rotation

[updateDate.js](updateDate.js) updates a text box on the first slide of the main presentation.

- Writes the current weekday, date and month
- Advances the rotation from DAY 1 through DAY 8 on weekdays, then returns to DAY 1
- Leaves the rotation number unchanged on Saturdays and Sundays

The script looks for the first text shape containing `DAY` and reads the existing rotation number from its final character. The text should therefore end in a value such as `DAY 3`.

### Refresh the TV presentation

[moveSlidesToTV.js](moveSlidesToTV.js) replaces the changing announcements in the TV presentation with slides from the main presentation.

- Uses `Safe@AISB Reporting` as the marker for the start of the permanent slides in each presentation
- Keeps the TV presentation's permanent section and replaces the announcements before it
- Copies the source announcements in their original order
- Removes video elements throughout the resulting TV presentation, including its permanent section

## Setup

1. Create a Google Apps Script project and add both scripts
2. Replace the presentation IDs in `SlidesApp.openById()` with the IDs of your source and TV presentations
3. Make sure the account running the scripts has access to both presentations and permission to edit them
4. Prepare the date text box on the source presentation's first slide, ending in `DAY 1` through `DAY 8`
5. Put the permanent-section marker in one text shape on the first permanent slide of each presentation
6. Run `updateDate()` before `moveSlidesToTV()` so the TV copy receives the updated date

Authorise access when prompted by Apps Script. Scheduling is configured separately; this repository contains the functions, without trigger configuration or the original presentations.

## Workflow assumptions

The date updater advances the rotation every time it runs on a weekday. It does not check whether it has already run that day or account for school holidays, so it should run once per school day with the Apps Script project's time zone set correctly.

The TV refresh edits its destination presentation directly. The marker needs to appear exactly once in each deck, with all permanent slides after it. If the layout or marker text changes, update the script to match and check the behaviour on copies first.

**Built with:** JavaScript, Google Apps Script and Google Slides
