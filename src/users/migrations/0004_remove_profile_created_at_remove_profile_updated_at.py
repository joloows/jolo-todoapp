# Generated by Django 4.0.6 on 2023-03-04 11:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_profile_avatar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='updated_at',
        ),
    ]
