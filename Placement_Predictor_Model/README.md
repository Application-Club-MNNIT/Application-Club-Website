# Campus_placement_Predictor

The project focuses on building a real time placement prediction model from kaggle datasets. It consists of following components,

**1. Raw_Placement_Data :** The unprocessed dataset, extracted from kaggle. It consists of various data inconsistencies, including missing vlaues, abnormal values etc.

**2. Code_For_Pre_Processing :** Complete python code used for data processing, starting from importing raw data to saving final processed data. It also includes different data visualizations between variables.

**3. processed_dataset :** The filtered dataset derived after applying different data cleaning methods. All variables in this data are numerical.

**4. model_selection_and_evaluation :** The python code used to test different models relevant to the usecase and fitting the dataset upon the best one. It also includes model evaluation across different performance metrics.

**5. placement_model.pkl :** The final model build after training and testing on the processed dataset. The model is an Ensemble of a Decision Tree Classifier.

**6. setting_Up_UI :** The codebase for Setting up the User Interface for the predictive model.

The overall score of the model upon training data was **83 (out of 100**). The UI of the model can be accessed by running the above code "setting_Up_UI" by calling the "placement_model.pkl" model
