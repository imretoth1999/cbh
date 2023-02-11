# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown 
We will have 2 types of tickets

Story: A ticket which requires code change

Task: A ticket which requires no code change

Every task will have the format CBH-XXXX where X is a number

I call Implementation details Dev notes since they will contain details related to both implementation and testing the feature

The estimations are done in story points and we use the fibonacci numbers (1, 2, 3, 5, 8 ...)

**Story: CBH-0001 Add custom id field in the Agents table**

**Acceptance Criteria**:

The Agents table should have a new column called "custom_id" where the Facility can store their own unique identifier for each Agent.

The custom_id field should be optional and can be empty.

**Estimate**: 

2 story points

**Dev notes**:

Create a new column called "custom_id" in the Agents table.

Update the logic for inserting new Agents into the database to allow for optional custom_id field.

Update the logic for updating existing Agents in the database to allow for optional custom_id field.

Cover both cases with unit tests.

**Story: CBH-0002 Use custom id field in the Shifts table**

**Acceptance Criteria**:

The Shifts table should have a new column called "agent_custom_id" which will store the custom id of the Agent assigned to each Shift.

If the Agent assigned to a Shift has a custom id, it should be stored in the agent_custom_id field, otherwise, the internal database id should be stored.

**Estimate**: 

2 story points

**Dev notes**:
Create a new column called "agent_custom_id" in the Shifts table.

Update the logic for inserting new Shifts into the database to store either the custom id or internal id of the assigned Agent.

Update the logic for updating existing Shifts in the database to allow for changes to the agent_custom_id field.

Write unit tests to cover both cases

**Story: CBH-0003 Return custom id in the getShiftsByFacility if available**

**Acceptance Criteria**:

The getShiftsByFacility function should return the custom id of the Agent assigned to each Shift if it is available, otherwise, it should return the internal database id.

**Estimate**: 

2 story points

**Dev notes**:

Update the logic for constructing the Shift objects returned by the getShiftsByFacility function to use the custom id if it is available, otherwise, use the internal database id.

Mock the Agents object and write unit tests to cover both the case where we have a custom id and when we don't

**Story: CBH-0004 Return custom id in the generateReport function if available**

**Acceptance Criteria**:

The generateReport function should use the custom id of the Agent assigned to each Shift if it is available, otherwise, it should use the internal database id.

**Estimate**: 

2 story points

**Dev notes**:

Update the logic in the generateReport function to use the custom id of the Agent if it is available, otherwise, use the internal database id.

Mock the Agents objects and write unit tests to cover both the case where we have a custom id and when we don't.

In case that the custom id has a different structure and size than the internal id, test that the rendering is happening as expected.

**Task: CBH-0005 Update confluence page and readme of the repositories**

**Acceptance Criteria**:

The project's documentation should be updated to reflect the changes made in Tickets 1-4, including details on the custom id field for Agents, the agent_custom_id field in the Shifts table, and the use of custom ids in the getShiftsByFacility and generateReport functions.

**Estimate**: 

1 story point

**Dev notes**:

Update the README of the repositories in bitbucket 

Update the project's confluence page to include a description of the custom id field for Agents, the agent_custom_id field in the Shifts table, and the use of custom ids in the getShiftsByFacility and generate