from django.contrib.auth.hashers import make_password
import user_grpc.proto.user_pb2_grpc as pb2_grpc
import user_grpc.proto.user_pb2 as pb2

from user_grpc.models import User
from django.db import IntegrityError

class UserService(pb2_grpc.UserServiceServicer):
    def CreateUser(self, request, context):
        email = request.email
        password = request.password
       
        if not email or not password:
            return pb2.UserResponse(
                message="Thiếu email hoặc mật khẩu",
                success=False
            )

        try:
            password = make_password(request.password)
            user = User.objects.create(email=email, password=password)
            return pb2.UserResponse(
                message=f"Đã tạo người dùng với email: {user.email}",
                success=True
            )
        except IntegrityError:
            return pb2.UserResponse(
                message="Email đã tồn tại",
                success=False
            )
        except Exception as e:
            return pb2.UserResponse(
                message=f"Lỗi: {str(e)}",
                success=False
            )

def grpc_handlers(server):
    pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
