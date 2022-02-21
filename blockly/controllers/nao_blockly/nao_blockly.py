"""supervisor_blockly controller."""

# You may need to import some classes of the controller module. Ex:
#  from controller import Robot, Motor, DistanceSensor
from controller import Robot

# create the Robot instance.
robot = Robot()

# get the time step of the current world.
timestep = int(robot.getBasicTimeStep())

# You should insert a getDevice-like function in order to get the
# instance of a device of the robot. Something like:
#  motor = robot.getDevice('motorname')
#  ds = robot.getDevice('dsname')
#  ds.enable(timestep)

# Main loop:
# - perform simulation steps until Webots is stopping the controller
while robot.step(timestep) != -1:
    message = robot.wwiReceiveText();
    if message:
        print(message)
        robot.wwiSendText("this is a test")
    # if (message == NULL)
      # continue;
    # if (strncmp(message, "reset", 5) == 0) {
      # wb_supervisor_simulation_reset();
      # wb_supervisor_node_restart_controller(nao);
    # } else if (strncmp(message, "upload:", 7) == 0) {
      # printf("received upload message\n");
      # remove("../nao_demo_python/nao_demo_python.py"); // deletes default controller if any
      # FILE *fd = fopen("../nao_demo_python/nao_demo_python.py", "w");
      # fprintf(fd, "%s", &message[7]);
      # fclose(fd);
      # wb_supervisor_simulation_reset();
      # wb_supervisor_node_restart_controller(nao);
    # }

# Enter here exit cleanup code.