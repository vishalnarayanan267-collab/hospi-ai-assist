# HOSPI-NET Dashboard

You are working on my existing GitHub repository:



vishalnarayanan267-collab/hospi_net



FIRST: Connect to and inspect the existing GitHub repository and its complete source code. Use the existing codebase as the starting point. DO NOT create a new project from scratch and DO NOT delete or replace the existing implementation without checking it.



PROJECT:

HOSPI-NET — AI-Powered Healthcare Emergency Coordination Platform



CONTEXT:

This is a Made in India Hackathon prototype. We need a highly polished, professional frontend prototype that looks like a real healthcare SaaS/product used by hospitals, emergency responders, government healthcare departments and patients.



The current repository contains the frontend generated from our earlier Figma design. Preserve useful existing components, pages, assets, layouts and functionality wherever possible, but significantly improve the overall consistency, UX, responsiveness and visual quality.



IMPORTANT:

This is currently a FRONTEND-FIRST prototype.



Do NOT build the full backend yet.

Do NOT require real APIs for the prototype.

Use realistic mock/demo data and local state where necessary so the complete UI can be demonstrated smoothly.



==================================================

1. INSPECT BEFORE MODIFYING

==================================================



First inspect:



- package.json

- src/

- existing pages

- existing components

- routing

- CSS/design system

- assets

- icons

- charts

- existing responsive layouts

- existing dependencies



Understand the current architecture before making changes.



Do not unnecessarily change the technology stack.



Reuse existing dependencies where practical.



==================================================

2. CORE PRODUCT EXPERIENCE

==================================================



The main demonstration flow must feel like a real emergency coordination platform:



Dashboard

→ Emergency

→ Emergency Detection

→ AI Hospital Recommendation

→ Ambulance Assigned

→ Live Ambulance Tracking

→ Hospital Selected

→ Bed Reserved

→ Doctor Notified

→ Emergency Timeline



This flow is the most important part of the prototype.



Every screen should feel connected rather than like separate student-project pages.



==================================================

3. DESIGN DIRECTION

==================================================



Create a premium healthcare SaaS interface.



Visual references:

- Apple

- Stripe

- Linear

- Notion

- Google Material 3



But do NOT copy any specific website.



Design characteristics:



- Minimal

- Professional

- Premium

- Trustworthy

- Modern

- Medical

- Clean

- Highly readable

- Spacious

- Strong visual hierarchy

- Minimal cognitive load



Use:



Background:

#F8FAFC



Primary:

#2563EB



Emergency:

#EF4444



Success:

#10B981



Warning:

#F59E0B



Accent:

#8B5CF6



Cards:

White



Border radius:

18–24px



Soft shadows



Subtle glass effects only where appropriate.



Typography:

Inter / system sans-serif



Use a consistent 8px spacing system.



Avoid excessive gradients, excessive shadows, excessive animations and unnecessary decoration.



The result must NOT look like a generic AI-generated dashboard.



It should look like a startup/product that could actually be demonstrated to judges or investors.



==================================================

4. GLOBAL UI

==================================================



Create a consistent application shell.



Desktop:



Left sidebar:

- HOSPI-NET logo

- Dashboard

- Emergency

- Live Ambulances

- Nearby Hospitals

- Bed Availability

- Medical Records

- Wearable Health

- Doctors

- AI Assistant

- Notifications

- Reports

- Emergency Timeline

- Emergency Contacts

- Settings

- Support



Top navigation:



- Global search

- Voice Assistant

- Language selector

- Notifications

- User profile

- Prominent SOS button



Mobile:



Use a clean responsive navigation system.



Do NOT simply squeeze the desktop sidebar onto mobile.



Use:

- mobile header

- bottom navigation where appropriate

- drawer navigation for secondary sections



==================================================

5. DASHBOARD

==================================================



Make the dashboard the strongest screen.



Include:



Welcome section



AI Health Status / Health Score



Emergency Quick Action



Live Ambulance Tracking



Nearby Hospitals



AI Hospital Recommendation



Bed Availability



Wearable Health Metrics



Emergency Timeline



Notifications



Emergency Contacts



Traffic / Weather / Location summary



Quick Actions



Use realistic sample data.



Charts should be visually clean and readable.



Do not overload the dashboard.



Prioritize the information that matters during an emergency.



==================================================

6. EMERGENCY EXPERIENCE

==================================================



Create a highly polished emergency interface.



Include:



Large SOS button



Voice Emergency



Emergency type selection



Automatic location detection mock state



Emergency contact notification



Call ambulance



Share live location



AI emergency analysis



Recommended hospital



Ambulance assignment



ETA



Emergency progress



Emergency timeline



The emergency flow should require as few interactions as possible.



Use confirmation states and clear feedback.



Make the emergency UI visually distinct but not frightening.



==================================================

7. LIVE AMBULANCE TRACKING

==================================================



Create a realistic map-style interface.



If a real Google Maps API is not available, create a convincing prototype map using an appropriate map placeholder or visual representation.



Show:



- Patient location

- Ambulance marker

- Hospital marker

- Route

- ETA

- Distance

- Ambulance ID

- Driver information

- Current status

- Traffic status



Use subtle animation for the ambulance marker if practical.



==================================================

8. HOSPITALS

==================================================



Nearby Hospitals:



Include:



- Search

- Filters

- Distance

- ETA

- Ratings

- ICU availability

- Emergency beds

- Doctor availability

- Emergency facilities

- AI recommendation badge

- Directions

- Call hospital



Hospital Details:



- Hospital overview

- Departments

- Doctors

- Facilities

- Bed availability

- Waiting time

- Emergency capacity

- Reviews

- Reserve Emergency Bed



==================================================

9. BED AVAILABILITY

==================================================



Create a professional live capacity dashboard.



Show:



ICU beds



Emergency beds



General beds



Ventilators



Occupancy



Available capacity



Hospital filters



Charts



Live status indicators



Reserve bed action



Use realistic mock values.



==================================================

10. MEDICAL RECORDS

==================================================



Create a clean patient medical record interface.



Include:



Health summary



Blood group



Allergies



Conditions



Current medications



Prescriptions



Lab reports



Vaccination history



Medical timeline



Download



Share



Use cards and tabs instead of one huge page.



==================================================

11. WEARABLE HEALTH

==================================================



Create:



Heart rate



SpO2



Blood pressure



Temperature



Respiration



ECG



Fall detection



Daily trends



Weekly trends



Monthly trends



AI health insights



Use realistic charts.



Make abnormal values visually clear without making the UI alarming.



==================================================

12. DOCTORS

==================================================



Doctor directory:



- Search

- Filters

- Specialization

- Availability

- Experience

- Rating

- Hospital

- Emergency availability



Doctor profile:



- Profile

- Specialization

- Education

- Experience

- Languages

- Hospital

- Schedule

- Emergency availability



==================================================

13. AI ASSISTANT

==================================================



Create a polished AI Assistant interface.



It should feel like a real healthcare/business assistant.



Include suggested questions such as:



"Which hospital is best for my emergency?"



"Which nearby hospitals have ICU beds?"



"What should I do during this emergency?"



"Show my recent health trends."



"Which doctor is available now?"



Use a chat-style interface.



For now, use mock responses and local state.



Do NOT claim that real medical AI is running.



Clearly position it as an AI-assisted prototype.



==================================================

14. NOTIFICATIONS

==================================================



Create:



Emergency alerts



Wearable alerts



Hospital updates



Doctor messages



Family alerts



System notifications



Use priority levels.



==================================================

15. REPORTS

==================================================



Include:



Health trends



Emergency history



Hospital visits



Wearable analytics



AI risk insights



Download report UI



Use clean charts.



==================================================

16. EMERGENCY TIMELINE

==================================================



Make this visually impressive.



Example:



Emergency Created

↓

AI Analysis

↓

Ambulance Assigned

↓

Driver Accepted

↓

Hospital Selected

↓

Bed Reserved

↓

Doctor Notified

↓

Ambulance En Route

↓

Ambulance Arrived

↓

Treatment Started



Use timestamps, statuses and clear visual progression.



==================================================

17. ROLE-BASED DASHBOARDS

==================================================



Create prototype screens for:



Patient



Doctor



Hospital Admin



Ambulance Driver



Emergency Dispatcher



System Administrator



Each role should have relevant navigation and information.



Use mock role switching if necessary.



Do not build complex authentication yet.



==================================================

18. HOSPITAL ADMIN

==================================================



Include:



Incoming emergencies



Bed management



Doctor availability



Patient queue



Emergency queue



Hospital analytics



==================================================

19. AMBULANCE DRIVER

==================================================



Include:



Assigned emergency



Patient information



Navigation



Destination hospital



ETA



Availability toggle



Trip completion



==================================================

20. EMERGENCY DISPATCHER

==================================================



Include:



Emergency requests



Assign ambulance



Hospital status



Communication panel



Live tracking



==================================================

21. AI MONITORING CENTER

==================================================



Include:



Critical patients



Wearable alerts



Risk indicators



Hospital load



Ambulance heatmap



Emergency analytics



==================================================

22. INTERACTIONS

==================================================



This must be a PROTOTYPE, not static screenshots.



Implement frontend interactions using local/mock state:



- Navigation

- Sidebar

- Tabs

- Search

- Filters

- Modal dialogs

- Emergency confirmation

- SOS flow

- Hospital selection

- Bed reservation

- Ambulance assignment

- Timeline progression

- Notifications

- AI chat mock responses

- Toggle states

- Profile menu

- Language selector

- Dark mode

- Responsive navigation



Actions should provide visual feedback.



Example:



Reserve Bed

→ confirmation

→ bed status changes to Reserved

→ timeline updates

→ notification appears



==================================================

23. MOCK DATA

==================================================



Create a centralized mock data layer.



Do NOT scatter random hardcoded values throughout components.



Use realistic sample data for:



patients



hospitals



doctors



ambulances



beds



emergencies



notifications



wearable readings



medical records



Use consistent IDs and relationships.



This will make backend integration easier later.



==================================================

24. COMPONENT ARCHITECTURE

==================================================



Use reusable components.



Examples:



AppShell



Sidebar



TopBar



PageHeader



StatCard



HospitalCard



DoctorCard



EmergencyCard



StatusBadge



MetricCard



Timeline



MapPanel



ChartCard



Modal



Toast



Button



Input



Tabs



EmptyState



LoadingState



ErrorState



Do not duplicate UI code unnecessarily.



==================================================

25. RESPONSIVENESS

==================================================



The application must work professionally on:



Desktop



Laptop



Tablet



Mobile



Pay special attention to:



- dashboard grids

- charts

- tables

- maps

- emergency buttons

- navigation

- cards

- typography



No horizontal overflow.



No broken layouts.



No tiny unreadable text.



Emergency controls must remain easy to access on mobile.



==================================================

26. ACCESSIBILITY

==================================================



Follow WCAG AA principles.



Use:



- sufficient contrast

- readable font sizes

- keyboard navigation

- visible focus states

- semantic HTML

- accessible labels

- large touch targets



The elderly-user experience is especially important.



==================================================

27. LOADING / EMPTY / ERROR STATES

==================================================



Every major data-driven page should have:



Loading state



Empty state



Error state



Success state



Use skeleton loaders where appropriate.



==================================================

28. ANIMATIONS

==================================================



Use subtle professional animations.



Examples:



page transitions



card hover



button feedback



notification appearance



timeline progression



ambulance movement



modal transitions



Do NOT over-animate the interface.



Performance is more important than decoration.



==================================================

29. DARK MODE

==================================================



Implement a polished dark mode using the same design system.



Do not simply invert colors.



Maintain:



readability



contrast



medical trust



clear emergency states



==================================================

30. HACKATHON DEMO PRIORITY

==================================================



Prioritize polish in this order:



1. Dashboard

2. Emergency Flow

3. AI Hospital Recommendation

4. Live Ambulance Tracking

5. Hospital + Bed Availability

6. Emergency Timeline

7. AI Assistant

8. Wearable Health

9. Medical Records

10. Remaining role dashboards



If time or implementation limitations exist, make these priority screens exceptionally polished rather than creating many incomplete screens.



==================================================

31. BACKEND PREPARATION

==================================================



Do not implement the actual backend now.



However, structure the frontend so that mock services can later be replaced with real APIs.



Create clear service boundaries such as:



services/



api/



mock/



Keep API-related logic separate from UI components.



Later we will connect:



- database

- authentication

- hospital data

- ambulance tracking

- wearable APIs

- AI services

- notifications

- real-time updates



==================================================

32. IMPORTANT DESIGN RULE

==================================================



DO NOT make every page look identical.



Maintain the same design system, but allow each workflow to have its own hierarchy.



Emergency should feel urgent.



Medical records should feel calm.



Analytics should feel data-focused.



AI Assistant should feel conversational.



Hospital management should feel operational.



==================================================

33. FINAL QUALITY CHECK

==================================================



After implementing the changes:



- Check every route.

- Check every major button.

- Check responsive layouts.

- Remove broken links.

- Remove placeholder lorem ipsum.

- Remove unnecessary duplicate components.

- Fix console errors.

- Fix overflow.

- Fix inconsistent spacing.

- Fix inconsistent typography.

- Fix broken icons.

- Ensure no page looks unfinished.



Most importantly:



The final result should look like a REAL healthcare technology product, not a college/student dashboard.



Preserve the existing HOSPI-NET identity and existing useful Figma-generated work while upgrading it into a cohesive, polished, hackathon-ready product.



DO NOT delete the existing project unless absolutely necessary.



START BY INSPECTING THE CONNECTED GITHUB REPOSITORY AND THEN IMPLEMENT THE IMPROVEMENTS IN THE EXISTING CODEBASE.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hospi-ai-assist.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5b74b812-69df-4c75-bfdc-66b4536d52e4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
