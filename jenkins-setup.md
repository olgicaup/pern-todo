# Jenkins CI/CD Setup Guide

This guide will help you set up Jenkins for your PERN ToDo App CI/CD pipeline.

## Prerequisites

1. **Jenkins Server** (local or cloud)
2. **Docker Hub Account** with access token
3. **Git Repository** with your code

## 1. Install Jenkins

### Option A: Local Installation (Windows)
```bash
# Download Jenkins from https://jenkins.io/download/
# Run the installer and follow the setup wizard
```

### Option B: Docker Installation
```bash
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

### Option C: Cloud Jenkins
- Use Jenkins on AWS, Azure, or other cloud providers
- Or use Jenkins X for Kubernetes

## 2. Install Required Jenkins Plugins

Go to **Manage Jenkins** → **Manage Plugins** → **Available** and install:

- **Docker Pipeline** (for Docker operations)
- **Docker plugin** (for Docker integration)
- **Git** (for Git integration)
- **NodeJS Plugin** (for Node.js support)
- **Pipeline** (for declarative pipelines)
- **Credentials Binding** (for secure credential management)

## 3. Configure Jenkins Tools

Go to **Manage Jenkins** → **Global Tool Configuration**:

### Node.js Configuration
- Name: `NodeJS 18`
- Install automatically: ✅
- Version: `18.x`

### Docker Configuration
- Name: `Docker`
- Install automatically: ✅
- Version: `latest`

## 4. Set Up Docker Hub Credentials

1. Go to **Manage Jenkins** → **Manage Credentials**
2. Click **System** → **Global credentials** → **Add Credentials**
3. Choose **Username with password**
4. Configure:
   - **ID**: `dockerhub-credentials`
   - **Description**: `Docker Hub Credentials`
   - **Username**: Your Docker Hub username
   - **Password**: Your Docker Hub access token
5. Click **OK**

## 5. Create Jenkins Pipeline Job

1. Go to **Dashboard** → **New Item**
2. Enter job name: `pern-todo-pipeline`
3. Select **Pipeline**
4. Click **OK**

### Configure the Pipeline:

1. **General Settings**:
   - ✅ **Discard old builds** (Keep last 10 builds)
   - ✅ **GitHub project** (if using GitHub)

2. **Build Triggers**:
   - ✅ **Poll SCM** (H/5 * * * * for every 5 minutes)
   - Or ✅ **GitHub hook trigger for GITScm polling** (if using GitHub webhooks)

3. **Pipeline**:
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: Your Git repository URL
   - **Credentials**: Add your Git credentials if private repo
   - **Branch Specifier**: `*/main` or `*/master`
   - **Script Path**: `Jenkinsfile`

4. Click **Save**

## 6. Configure Webhooks (Optional)

If using GitHub, set up webhooks for automatic triggering:

1. Go to your GitHub repository → **Settings** → **Webhooks**
2. Click **Add webhook**
3. Configure:
   - **Payload URL**: `http://your-jenkins-url/github-webhook/`
   - **Content type**: `application/json`
   - **Events**: ✅ **Just the push event**
4. Click **Add webhook**

## 7. Test the Pipeline

1. Go to your Jenkins job
2. Click **Build Now**
3. Monitor the build progress
4. Check the console output for any issues

## 8. Production Deployment Setup

To enable production deployment, you'll need:

### SSH Credentials for Production Server
1. Go to **Manage Jenkins** → **Manage Credentials**
2. Add SSH credentials for your production server
3. Update the Jenkinsfile with your server details

### Example Production Deployment
```bash
# In the Jenkinsfile, uncomment and modify the deployment section:
sh '''
    ssh user@your-production-server.com << 'EOF'
        cd /path/to/your/app
        docker-compose -f docker-compose.prod.yml pull
        docker-compose -f docker-compose.prod.yml up -d
        docker system prune -f
    EOF
'''
```

## 9. Environment Variables

You can set environment variables in Jenkins:

1. Go to **Manage Jenkins** → **Configure System**
2. Add environment variables:
   - `DOCKER_REGISTRY`: `docker.io`
   - `DOCKER_IMAGE_PREFIX`: `your-dockerhub-username`

## 10. Monitoring and Notifications

### Email Notifications
1. Go to **Manage Jenkins** → **Configure System**
2. Configure SMTP settings
3. Add email notifications to your pipeline

### Slack Notifications
1. Install **Slack Notification Plugin**
2. Configure Slack webhook
3. Add notifications to your pipeline

## Troubleshooting

### Common Issues:

1. **Docker Permission Denied**:
   ```bash
   # Add jenkins user to docker group
   sudo usermod -aG docker jenkins
   sudo systemctl restart jenkins
   ```

2. **Node.js Not Found**:
   - Ensure NodeJS plugin is installed
   - Check Node.js installation in Global Tool Configuration

3. **Docker Build Fails**:
   - Check Docker daemon is running
   - Verify Dockerfile syntax
   - Check available disk space

4. **Git Authentication**:
   - Add SSH keys or username/password credentials
   - Check repository permissions

## Pipeline Features

This Jenkins pipeline includes:

- ✅ **Parallel execution** for faster builds
- ✅ **Docker image building** and pushing
- ✅ **Versioned images** with build numbers
- ✅ **Production deployment** (configurable)
- ✅ **Workspace cleanup** after builds
- ✅ **Error handling** and notifications

## Next Steps

1. Set up your Jenkins server
2. Configure credentials and tools
3. Create the pipeline job
4. Test with a small change
5. Configure production deployment
6. Set up monitoring and notifications

Your PERN ToDo App is now ready for automated CI/CD with Jenkins! 