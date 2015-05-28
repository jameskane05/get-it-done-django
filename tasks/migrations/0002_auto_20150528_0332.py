# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='TaskList',
        ),
        migrations.RenameField(
            model_name='task',
            old_name='pub_date',
            new_name='created',
        ),
    ]
