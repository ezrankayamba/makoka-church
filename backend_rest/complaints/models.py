from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
STATUS_CREATED = 'Not Assigned'
STATUS_OPEN = 'Assigned'
STATUS_COMPLETED = 'Completed'
STATUS_FEEDBACK_SENT = 'Feedback Sent'
COMPLAINT_STATUS = [
    (STATUS_CREATED, STATUS_CREATED),
    (STATUS_OPEN, STATUS_OPEN),
    (STATUS_COMPLETED, STATUS_COMPLETED),
    (STATUS_FEEDBACK_SENT, STATUS_FEEDBACK_SENT),
]


class Nature(models.Model):
    name = models.CharField(max_length=40, unique=True)

    def __str__(self):
        return self.name


class Location(models.Model):
    name = models.CharField(max_length=40, unique=True)

    def __str__(self):
        return self.name


class Complaint(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False)
    open_date = models.DateTimeField()
    client_name = models.CharField(max_length=100)
    nature = models.ForeignKey(to=Nature,
                               on_delete=models.PROTECT,
                               related_name='nature_complaints')
    location = models.ForeignKey(to=Location,
                                 on_delete=models.PROTECT,
                                 related_name='location_complaints',
                                 null=True)
    status = models.CharField(max_length=20,
                              choices=COMPLAINT_STATUS,
                              default=STATUS_CREATED)
    details = models.CharField(max_length=500)

    rca = models.CharField(max_length=255, null=True, blank=True)
    action_plan = models.CharField(max_length=255, null=True, blank=True)
    results = models.CharField(max_length=500, null=True, blank=True)
    financial_impact = models.CharField(max_length=255, null=True, blank=True)
    cost_center = models.CharField(max_length=255, null=True, blank=True)
    responsible_person = models.CharField(max_length=255,
                                          null=True,
                                          blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    close_date = models.DateTimeField(null=True, blank=True)
    assigned_to = models.ForeignKey(to=User,
                                    on_delete=models.PROTECT,
                                    null=True,
                                    related_name='assigned_complaints')
    assigned_by = models.ForeignKey(to=User,
                                    on_delete=models.PROTECT,
                                    null=True,
                                    related_name='assigner_complaints')
    assigned_at = models.DateTimeField(null=True)
    closed_by = models.ForeignKey(to=User,
                                  on_delete=models.PROTECT,
                                  null=True,
                                  related_name='closed_complaints')

    def __str__(self):
        return f'{self.open_date.strftime("%d/%m/%Y")} - {self.client_name}'

    class Meta:
        ordering = ['-created_at']


class Document(models.Model):
    complaint = models.ForeignKey(to=Complaint,
                                  related_name='docs',
                                  on_delete=models.CASCADE)
    file = models.FileField(upload_to='attachments')

    def __str__(self):
        return self.file.name


class Feedback(models.Model):
    email = models.CharField(max_length=100)
    remarks = models.CharField(max_length=500)
    feedback_by = models.ForeignKey(to=User,
                                    on_delete=models.PROTECT,
                                    null=True,
                                    related_name='feedback_complaints')
    feedback_at = models.DateTimeField(null=True)
    complaint = models.OneToOneField(to=Complaint, on_delete=models.PROTECT)

    def __str__(self):
        return self.remarks


class FeedbackDocument(models.Model):
    file = models.FileField(upload_to='feedback_docs')
    feedback = models.ForeignKey(to=Feedback,
                                 related_name='docs',
                                 on_delete=models.CASCADE)

    def __str__(self):
        return self.file.name
