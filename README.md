**Hospital Management**

to run the project make sure the following dependencies or tools to be working on your system.

1] IntelliJ/eclipse/STS   - prefered IntelliJ to run the backend application which is a maven based spring boot application.

2] VS Code or any file editor  for the fronend application which is build on the plain Javascript, Html and Css.

3] MySQL server - make sure you have created a database in mysql with name "hospitalpatients" and default credentials has to username:root and password:root.

**To run backend APP**

open the backend application in IntelliJ or Eclipse, as maven it is a maven spring boot application it will fetch all the dependencies from MVN Repo.
the application is set to run on the Port number 8085(make sure this port is free to use- don't change it because complete is UI is configured with port 8085).

It also requires the MySQL server, so make sure it is on the port 3306 and add a database as "hospitalpatients" (if you don't create this db then backend application will not run);

goto the main class com.hospital.patients.SpringBootDataJpaApplication and run the application from here. 

**To run frontend APP**

goto the frontend folder from the clone repository and locate the index.html then simple open it with chrome or any browswer

Click on the patients menu there and you'll find the data loaded of all the available patients
you can select one of the patient in the grid to view its details on right side where you can update any details regarding that patient.
you can add new patient with help of add new patiend button top of the grid table.
you can choose to discharge the patiend which will technically deletes that patient details DB and also from the grid table.
you can update the patient details where after updating and clicking on save button, you can see the toast message on bottom right corner and the table will also gets updated with the data.  
