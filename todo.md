### TODO: 1/17/18
  Bill page
  - TODO: setup page similar to vote page with bill number
    # TODO /api/bill/<bill_id>
  Votes:
  - DONE: remove tool tip from vote afters slider is touched
  - DONE: put my vote on all charts, 
  - DONE: move the position of the tooltip up so the point of the arrow lands on bottom line of the grey box.
  - TODO: checkbox css to match repme blue
  - DONE: get what ever social media links are available
    # DONE: set up to email callback / icon
  - TODO: slider
    # DONE: blue tool tip goes away entirely
    # DONE: make slider hint a little larger and more apparent(red)
    # DONE: continue showing slider error tooltip, maybe not as big though
  - TODO: validation modal, for zip and email to remind to enter / challenge
    # TODO: modal for slider submission
    # TODO: modal pop up with option for data entry  with go back(return to entry) or "no thanks" continue(submit) for either/or/and email and zipcode


  Results:
  - TODO: Show revote on results page 100% of time, show on homepage based on cookie logic.
  - TODO: ballots results and ballot vote only


  Widget:
  - TODO: validation error go to vote page with option to input email and zipcode


  xxDiscussions:
  - TODO: cookies
  - TODO: Bill closed logic


  Email:
  - TODO: setup smaller candidate card and flex inline row so they are side by side and carry over
  - TODO: setup roll call vote results

  xxFuture TODOS:
  - TODO: match css further to do design
  - TODO: bill page
    # TODO: /api/bill/<bill_id>
    # TODO: /vote/bill/<bill_id>

# DONE: Create RepMe Front End UI
-- DONE: Header
-- DONE: Custom Slider that passes vote data and color style data
-- DONE: Customize slider icon
-- DONE: Banner that translates slide color ontop of background image
-- DONE: background image
-- DONE: Pop on hover over slider
-- DONE: inputs for form submission -- form submission
-- DONE: form submission button
-- DONE: Footer component with social media buttons
-- DONE: Social Media buttons
-- DONE: Setup cookies for  vote --> submit --> resubmit
-- DONE: update font assets, implement states assets
-- DONE: setup dummy api based on routes

-- DONE: make sure to update routing and submission forms for recasting, check invision
-- DONE: Create README
-- DONE: Refactor dummy data so api data will get passed through better, also check api routing logic
-- TODO: GET--DONE: Need to verify congress/ senate results in element, if not made create - RESULT OF ROLL
-- TODO: GET--DONE: -- ASAP Xsubmit, Xresubmit, results, Xslider, results email


-- TODO: refactor styling to a core configuration flow i.e pass one config for all colors
    like this <Component config={this.props.styleConfig} />
#Create Admin Routes and Holder 

## Notes:
--  TODO: security
--  DONE: Routing
--  TODO: CORS setup
--  REVIEW: build admin panel navigation on left,
    field on top, data in the middle
--  note admin vs public view of each 
    route in admin page based on login / credentials
--  create front end admin login logic
--  create server profile logic (later on)
--  create cookie login logic (maybe later on, research now) 
## components within repme admin panel view
   - INPROGRESS: Login Page
   - INPROGRESS: Bills
   - INPROGRESS: Roll Call
   - Users
   - INPROGRESS: Votes 
   - Organizations admin **** start here
   - Groups
#Create Admin Scaffolding
  ## Create Login Page / Components
  ## Create Site Nav bar components
  ## Create Site / User Preferences Pages
# Create List views for Bills
  ## Table Column component
  ## Filter based on info
# Create Form
  ## Add
  ## Delete
  ## Edit

#### Create Modules 
  -- (Single file JS Settings/Multiple files module[i.e. -events])  