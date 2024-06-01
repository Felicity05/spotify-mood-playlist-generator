# Use the Lambda-provided Python 3.9 base image
FROM public.ecr.aws/lambda/python:3.9

# Copy function code
COPY server.py ${LAMBDA_TASK_ROOT}
COPY aws.py ${LAMBDA_TASK_ROOT}
COPY mood_predictor_rf_model.pkl ${LAMBDA_TASK_ROOT}
COPY requirements.txt  .

# Install dependencies
RUN pip install -r requirements.txt

# Command to run the Lambda function
CMD ["aws.handler"]
