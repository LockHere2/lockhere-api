const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
    {
        serverUrl: 'http://localhost:9002',
        options: {
            'sonar.sources': 'src',
            'sonar.tests': 'test',
            'sonar.inclusions': '**', // Entry point of your code
            'sonar.test.inclusions': 'test/**/*.spec.js',
            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
            //'sonar.testExecutionReportPaths': 'coverage/test-reporter.xml'
        }
    }, () => { });
