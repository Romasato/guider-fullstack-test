## My Decisions Log

* Moving /availability REST API endpoint under /api path - where all future API endpoints should be to avoid clashing with any future UI routes.
* Some clean up to start with: grouping components and styles into their own separate directories.

* Looking at the UI design example thinking these are the components we will need to create:
    * UserTimezone
    * Calendar
        * CalendarDate
        * TimeSlots
            * TimeSlot
    
* Not planing on unit-testing React components themselves as they are declarative in nature and I therefore I do not believe there is enough benefit in testing components this way. Especially will be painful to update unit tests once refactoring time comes. Storybook-style (visual TDD) is a much better approach.

* Choosing named-exports over default ones. This provides better refactorability when and if the time comes.
