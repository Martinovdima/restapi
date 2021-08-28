# Generated by Django 3.2.3 on 2021-08-25 06:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_todo_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='project',
            new_name='projects',
        ),
        migrations.RenameField(
            model_name='todo',
            old_name='user',
            new_name='users',
        ),
        migrations.AlterField(
            model_name='todo',
            name='create_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 8, 25, 12, 48, 56, 623068)),
        ),
        migrations.AlterField(
            model_name='todo',
            name='update_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 8, 25, 12, 48, 56, 624068)),
        ),
    ]
