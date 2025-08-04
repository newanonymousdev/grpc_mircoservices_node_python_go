from django.core.management.base import BaseCommand
from subprocess import Popen
from sys import stdout, stdin, stderr
import time
import os
import signal


class Command(BaseCommand):
    help = 'Run both Django and gRPC servers'
    commands = [
        'python manage.py grpcserver',   # Chạy gRPC server
        'python manage.py runserver'     # Chạy Django server
    ]

    def handle(self, *args, **options):
        proc_list = []

        # Chạy cả hai server
        for command in self.commands:
            print("$ " + command)
            proc = Popen(command, shell=True, stdin=stdin,
                         stdout=stdout, stderr=stderr)
            proc_list.append(proc)

        try:
            while True:
                time.sleep(10)  # Giữ cho tiến trình chính sống
        except KeyboardInterrupt:
            # Khi người dùng nhấn Ctrl+C, kết thúc các server
            for proc in proc_list:
                os.kill(proc.pid, signal.SIGKILL)

