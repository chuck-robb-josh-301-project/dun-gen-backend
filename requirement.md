# Dun.Gen() Software Requirements

## Vision

Dun.Gen() is a procedurally generated fantasy story application. The existing generator applications using the D&D 5e API don't provide the user with a story to begin their quest. Dun.Gen() not only generates the elements required to start a quest, but most importanly provides the user with a quest in a story based format to begin their adventure.

### Scope In

- User choices to progress story
- API shuffling for random generator
- Hard coded strings for story templates
- Saving character information and the current quest to user profile in database

### Scope Out

- Not a complicated combat system
- Finite number of story beats

## MVP Requirements

- Authenticator for log in
- Incorporate an API
- Incorporate database to save user information
- Display front end text using multiple dynamic elements
- User friendly React components
- Create/Read a character/quest
- Update progress and inventory
- Delete a character/quest
- About Us Page

### Stretch Goals

- React popover component with information of each object
- Dynamically rendered background image
- React accordion component for character list information
- Export story transcript
- Image API for characters and inventory to render
- Thesaurus API to add synonyms of words in template

## Functional Requirements

- User can Create/Read a character/quest
- User can Update progress and inventory
- User can Delete a character/quest
  
### Data Flow

![Data Flow Diagram](/img/dom-data-schema-two.png)

## Non-Functional Requirements

1. Text Centric - As a text-centric front-end, the readability of the app is preferred. Proper contrast, font selection, and window scalability are central to styling. All other front-end components must appropriately compliment or accentuate the text -- like stretch goals of quiet background images or data-driven pop-overs.
2. Device compatibility and usability - The ability for the app to be used on multiple devices. A mobile device or tablet should be able to dynamically display our components. A user should be able to use the application on any device.
