package logging

import (
	"os"

	"github.com/sirupsen/logrus"
)

// Create a new instance of the logger. You can have any number of instances.
var log = logrus.New()

func Initial() *logrus.Logger {

	// The API for setting attributes is a little different than the package level
	log.Out = os.Stdout

	// Log as JSON instead of the default ASCII formatter.
	log.SetFormatter(&logrus.TextFormatter{
		FullTimestamp: true,
	})

	// Output to stdout instead of the default stderr
	log.SetOutput(os.Stdout)

	// Only log the certain severity or above.
	log.SetLevel(logrus.DebugLevel)

	return log

}
